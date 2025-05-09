const Complaint = require('./complaintSchema')

// Add buyer Complaint

const BuyerAddComplaints = async (req, res) => {
    try {
        const {
            description,
        } = req.body;
        const newComplaint = new Complaint.buyercomplaint({
            description,
            buyerId: req.params.id
        })
        await newComplaint.save()
            .then(data => {
                res.status(200).json({
                    msg: "Complaint send successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Data not Send",
                    data: err
                });
            });
    } catch (error) {
        console.log("err", error);
        res.status(500).json({ message: error.message });
    }
}

// Add artisanestor Complaint

const artisanAddComplaints = async (req, res) => {
    try {
        const {
            description,
        } = req.body;
        const newComplaint = new Complaint.artisancomplaint({
            description,
            artisanId: req.params.id
        })
        await newComplaint.save()
            .then(data => {
                res.status(200).json({
                    msg: "Complaint send successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    msg: "Data not Send",
                    data: err
                });
            });
    } catch (error) {
        console.log("err", error);
        res.status(500).json({ message: error.message });
    }
}

// View buyercomplaint 
const viewbuyerComplaint = (req, res) => {
    Complaint.buyercomplaint.find().populate('buyerId')
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data obtained successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "No Data obtained",
                Error: err,
            });
        });
};

// View artisanestor complaint 
const viewartisanComplaint = (req, res) => {
    Complaint.artisancomplaint.find().populate('artisanId')
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data obtained successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: "No Data obtained",
                Error: err,
            });
        });
};

const viewBuyerComplaintById = (req, res) => {
    Complaint.buyercomplaint.find({ buyerId: req.params.id })
        .populate('buyerId')
        .then((data) => {
            res.status(200).json({
                msg: "Buyer complaints fetched successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Failed to fetch buyer complaints",
                error: err,
            });
        });
};

// View complaints by specific Artisan ID
const viewArtisanComplaintById = (req, res) => {
    Complaint.artisancomplaint.find({ artisanId: req.params.id })
        .populate('artisanId')
        .then((data) => {
            res.status(200).json({
                msg: "Artisan complaints fetched successfully",
                data: data,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                msg: "Failed to fetch artisan complaints",
                error: err,
            });
        });
};

module.exports = {
    BuyerAddComplaints,
    artisanAddComplaints,
    viewbuyerComplaint,
    viewartisanComplaint,
    viewBuyerComplaintById,
    viewArtisanComplaintById,
}

