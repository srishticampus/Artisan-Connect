import joblib
import pandas as pd
import sys
import json

try:
    print("Starting predict.py")

    # Load model and preprocessing artifacts
    model = joblib.load("random_forest_model.pkl")
    encoder = joblib.load("onehot_encoder.pkl")
    unique_Category = joblib.load("unique_Category.pkl")
    X_columns = joblib.load("X_columns.pkl")

    # Read JSON input from stdin
    input_text = sys.stdin.read()
    try:
        input_data = json.loads(input_text)
    except json.JSONDecodeError as e:
        print(json.dumps({'error': f'Invalid JSON input: {str(e)}'}))
        sys.exit(1)

    print("Parsed input:", input_data)

    # Validate required fields
    required_fields = ['Name', 'Category']
    missing_fields = [field for field in required_fields if field not in input_data]
    if missing_fields:
        print(json.dumps({'error': f'Missing fields: {", ".join(missing_fields)}'}))
        sys.exit(1)

    # Prepare input DataFrame
    single_df = pd.DataFrame([{
        'Name': input_data['Name'],
        'Category': input_data['Category']
    }])

    # Add binary category columns
    for cat in unique_Category:
        single_df[cat] = single_df['Category'].apply(
            lambda x: 1 if pd.notna(x) and cat in x.split(", ") else 0
        )

    # Drop unused columns
    X_new = single_df.drop(columns=['Name', 'Category'], errors='ignore')

    # Add missing columns with 0s
    for col in X_columns:
        if col not in X_new.columns:
            X_new[col] = 0

    # Reorder columns to match training
    X_new = X_new[X_columns]

    # Transform with encoder
    X_encoded = encoder.transform(X_new)
    X_encoded_df = pd.DataFrame(
        X_encoded,
        columns=encoder.get_feature_names_out(X_columns)
    )

    # Predict
    predicted_price = model.predict(X_encoded_df)[0]

    # Output result
    print(json.dumps({
        'price': float(predicted_price),
        'product_name': input_data['Name']
    }))

except Exception as e:
    print(json.dumps({'error': str(e)}))
    sys.exit(1)
