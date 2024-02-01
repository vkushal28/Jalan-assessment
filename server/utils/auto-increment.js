module.exports = {
    getNumOfDocs(model, filterDeleted = false) {
        if (filterDeleted) {
            return model.countDocuments({ deleted: { $ne: true } })
        } else {
            return model.countDocuments();
        }
    }
}
//This function counts the number of objects present in the provided collection in the db