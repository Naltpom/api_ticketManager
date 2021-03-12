const createCategory = function(category) {
    return db.Category.create(category).then(docCategory => {
      console.log("\n>> Created Category:\n", docCategory);
      return docCategory;
    });
  };

  const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      { category: categoryId },
      { new: true, useFindAndModify: false }
    );
  };

  const run = async function() {
    var tutorial = await createTutorial({
      title: "Tutorial #1",
      author: "bezkoder"
    });
  
   var category = await createCategory({
      name: "Node.js",
      description: "Node.js tutorial"
    });
  
    tutorial = await addTutorialToCategory(tutorial._id, category._id);
    console.log("\n>> Tutorial:\n", tutorial);
  };

  const getTutorialsInCategory = function(categoryId) {
    return db.Tutorial.find({ category: categoryId })
      .populate("category", "name -_id")
      .select("-comments -images -__v");
  };
  
  const run = async function() {
    var tutorial = await createTutorial({
      title: "Tutorial #1",
      author: "bezkoder"
    });
  
    var category = await createCategory({
      name: "Node.js",
      description: "Node.js tutorial"
    });
  
    await addTutorialToCategory(tutorial._id, category._id);
  
    var newTutorial = await createTutorial({
      title: "Tutorial #2",
      author: "bezkoder"
    });
  
    await addTutorialToCategory(newTutorial._id, category._id);
  
    var tutorials = await getTutorialsInCategory(category._id);
    console.log("\n>> all Tutorials in Cagetory:\n", tutorials);
  };