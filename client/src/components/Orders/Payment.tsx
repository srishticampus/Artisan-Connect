import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../BaseApi/Baseurl'

function Payment() {
    const {id}=useParams()
    const userid=localStorage.getItem("buyerid")
    // console.log(userid);

    const[art,setArt]=useState({})

    useEffect(()=>{
        axiosInstance.post(`viewArtworkById/${id}`)
        .then((res)=>{
            console.log(res);
            setArt(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const [formData, setFormData] = useState({
        number: '',
        cdnumber: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          numberError: '',
          cdnumberError: ''
        });
      };
    const navigate=useNavigate()

    const orderfn=((artid,artistId)=>{
        if (formData.number.length !== 16) {
            setFormData({ ...formData, numberError: 'Card number must be 16 digits.' });
            return;
          }
          // Validation for CVV
          if (formData.cdnumber.length < 3) {
            setFormData({ ...formData, cdnumberError: 'CVV must be at least 3 digits.' });
            return;
          }
      
        axiosInstance.post(`orderitem`, {
          userid: userid,
          artid: artid,
          artistId: artistId
        })
        .then((res)=>{
          // console.log(res);
          if(res.data.status===200){
          alert("Ordered successfully")
            navigate("/gallery")
          }
        })
        .catch((error) => {
          console.error("Error :", error);
        });
      })
    
    

  return (
    <div>
            <div>
      <div>
        <div className="container-xxl py-5">
          <div className="container">
            <div className="row g-5 ">
              <div
                className="col-lg-6  wow fadeIn "
                data-wow-delay="0.5s"
                style={{ marginTop: "7rem" }}
              >
                 <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent default form submission
                    orderfn(art._id, art.artistId._id); // Call your order function
                }}
                > 
                  <div className="row">
                    {/* <div className="col-md-4">Choose a Date</div> */}
                    {/* <div className="col-md-8">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Your Name"
                        min={new Date().toISOString().split("T")[0]}
                        style={{ marginBottom: "20px" }}
                        name="servicedate"
                        required
                        title="please fill"
                      />
                    </div> */}
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="cardHolderName"
                          placeholder="Your Name"
                          name="name"
                        //   value={form.name}
                        //   onChange={changefn}
                          required title='please fill'
                        />

                        <label for="name">Card Holder Name</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="cardNo"
                          placeholder="Your Name"
                          name="number"
                        //   value={form.number}
                          onChange={(e) => {
                            handleInputChange(e);
                            // changefn(e)
                          }}
        
                          required
                        />
                       <p style={{color: 'red'}}>
                        {formData.numberError}
                        </p>
                        <label for="cardNo">Card Number</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="number"
                          className="form-control"
                          id="cvv"
                          placeholder="Your Name"
                          required
                          name="cdnumber"
                        //   value={form.cdnumber}
                          onChange={(e) => {
                            handleInputChange(e);
                            // changefn(e)
                          }}

                        />
                       <p style={{color: 'red'}}>
                        {formData.cdnumberError}
                        </p>
                        <label for="email">CVV</label>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-floating">
                        <div className="form-group">
                          <div className="row">
                            <div className="col-4">
                              <label for="email">Expiry</label>
                            </div>
                            <div className="col-4">
                              <label for="email">Month</label>
                              <select
                                className="form-control"
                                name="month"
                                id="month"

                                required
                              >
                                <option>Month</option>
                                <option value="January">January</option>
                                <option value="February">February</option>
                                <option value="March">March</option>
                                <option value="April">April</option>
                                <option value="May">May</option>
                                <option value="June">June</option>
                                <option value="July">July</option>
                                <option value="August">August</option>
                                <option value="September">September</option>
                                <option value="October">October</option>
                                <option value="November">November</option>
                                <option value="December">December</option>
                              </select>
                            </div>
                            <div className="col-4">
                              <label for="email">Year</label>
                              <select
                                className="form-control"
                                name="year"
                                id="year"
                                required
                              >
                                <option>Year</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                                <option value="2037">2037</option>
                                <option value="2038">2038</option>
                                <option value="2039">2039</option>
                                <option value="2040">2040</option>
                                <option value="2041">2041</option>
                                <option value="2042">2042</option>
                                <option value="2043">2043</option>
                                <option value="2044">2044</option>
                                <option value="2045">2045</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-success" type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className="col-lg-6 wow fadeIn"
                data-wow-delay="0.5s"
                style={{ marginTop: "5rem" }}
              >
                <div className="d-flex justify-content-center">
                 
                </div>

                <h1 className="mb-4">
                  Total Amount -{" "}
                  <span style={{ color: "#00b074" }}>₹{art.price}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Payment