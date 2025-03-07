import express from "express";
const app = express();
import bodyParser from "body-parser";
const blogPosts = [];  //Empty array to store blog posts//

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));  

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

// Handle form submission
app.post("/submit", (req, res) => {
    const newEntry = {
        id: blogPosts.length + 1,
        title: req.body.title,
        blogEntry: req.body.blogEntry
    };
    blogPosts.push(newEntry); //Adds new entry to array.
    res.redirect("/"); // Redirect to home so entry appears on homepage.
});

// Route to render the edit page
app.get('/edit/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const blog = blogPosts.find(b => b.id === blogId);

    if (!blog) {
        return res.status(404).send("Blog post not found");
    }

    res.render('edit', { blog }); // Render single blog for editing
});

// Route to handle edit submission
app.post('/edit/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const { title, blogEntry } = req.body;

    let blog = blogPosts.find(b => b.id === blogId);
    if (blog) {
        blog.title = title;
        blog.blogEntry = blogEntry;
    }

    res.redirect('/'); // Redirect back to the homepage after editing
});

// Route to handle deleting a blog post
app.post("/delete/:id", (req, res) => {
    const blogId = parseInt(req.params.id);
    
    // Find index of the blog post with the given ID
    const myIndex = blogPosts.findIndex(b => b.id === blogId);

    if (myIndex !== -1) {
        blogPosts.splice(myIndex, 1); // Remove post from the array
    }

    res.redirect("/"); // Redirect to the homepage after deletion
});

app.listen(3000, () => {
    console.log("Server running on port 3000.");
    });



    
