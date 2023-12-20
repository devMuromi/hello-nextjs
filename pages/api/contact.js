async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (!email || !email.includes("@") || !name || name.trim() === "" || !message || message.trim() === "") {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    };

    // use firebase to store the data
    try {
      const firebaseUrl = "https://hello-nextjs-9a642-default-rtdb.firebaseio.com/contact.json";
      const response = await fetch(firebaseUrl, {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      console.log(responseData); // Optional: log Firebase response

      res.status(201).json({ message: "Successfully stored message!", message: newMessage });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Storing the message failed!" });
    }
  }
}

export default handler;
