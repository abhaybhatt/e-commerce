const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({ error: "Category not found" });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
     const category = new Category(req.body);
     category.save((err, cate) =>{
        if (err) {
            return res.status(400).json({ error: "Not able to create category in db" });
        }
        return res.json({cate});
     })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res)=>{
    Category.find().exec((err, items) => {
        if(err){
            return res.status(400).json({error: "No categories found"});
        }
        return res.json(items);
    })
}


exports.updateCategory = ( req, res ) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({error: "Failed to update category"});
        }
        res.json(updatedCategory);
    })
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, deletedCategory) =>{
        if(err){
            return res.status(400).json({error: "Failed to delete category"});
        }
        res.json({
            message: "successfully deleted"
        })
    })
}