import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewPost = () => {
  const [postType, setPostType] = useState("question");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [articleText, setArticleText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

const handlePost = async () => {
  try {
    const tagList = tags.split(",").map(tag => tag.trim()).slice(0, 3);

    let imageUrl = "";

    if (postType === "article" && image) {
      const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const postData = {
      postType,
      title,
      tags: tagList,
      createdAt: new Date()
    };

    if (postType === "article") {
      postData.abstract = abstract;
      postData.articleText = articleText;
      postData.imageUrl = imageUrl;
    } else {
      postData.questionText = questionText;
    }

    await addDoc(collection(db, "posts"), postData);
    alert("Post submitted successfully!");

    // Reset all fields
    setTitle("");
    setAbstract("");
    setArticleText("");
    setQuestionText("");
    setTags("");
    setImage(null);
  } catch (error) {
    console.error("Error uploading post:", error);
    alert("Failed to submit post. Check the console for details.");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h3>New Post</h3>
      <div>
        <label>Select Post Type: </label>
        <label>
          <input
            type="radio"
            value="question"
            checked={postType === "question"}
            onChange={() => setPostType("question")}
          />{" "}
          Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === "article"}
            onChange={() => setPostType("article")}
          />{" "}
          Article
        </label>
      </div>

      <hr />
      <h4>What do you want to ask or share</h4>
      <p>
        This section is designed based on the type of the post. It could be developed by
        conditional rendering.
        {postType === "question"
          ? " For post a question, the following section would be appeared."
          : " For post an article, the following section would be appeared."}
      </p >

      <div>
        <label>
          Title{" "}
          <input
            type="text"
            value={title}
            placeholder={
              postType === "question"
                ? "Start your question with how, what, why, etc."
                : "Enter a descriptive title"
            }
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>

      {postType === "article" && (
        <>
          <div>
            <label>
              Add an image:{" "}
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </label>
          </div>
          <div>
            <label>
              Abstract{" "}
              <textarea
                value={abstract}
                placeholder="Enter a 1-paragraph abstract"
                onChange={(e) => setAbstract(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Article Text{" "}
              <textarea
                value={articleText}
                placeholder="Enter a 1-paragraph article body"
                onChange={(e) => setArticleText(e.target.value)}
              />
            </label>
          </div>
        </>
      )}

      {postType === "question" && (
        <div>
          <label>
            Describe your problem{" "}
            <textarea
              value={questionText}
              placeholder="Describe your problem"
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </label>
        </div>
      )}

      <div>
        <label>
          Tags{" "}
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder={`Please add up to 3 tags to describe what your ${postType} is about e.g., Java`}
          />
        </label>
      </div>

      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default NewPost;