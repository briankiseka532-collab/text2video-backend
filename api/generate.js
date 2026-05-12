export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({
      error:"Method not allowed"
    });
  }

  try {

    const { prompt } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/Wan-AI/Wan2.1-T2V-1.3B",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_HF_TOKEN",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    if (!response.ok) {

      const error =
        await response.text();

      return res.status(500).json({
        error
      });

    }

    const video =
      await response.arrayBuffer();

    res.setHeader(
      "Content-Type",
      "video/mp4"
    );

    res.send(
      Buffer.from(video)
    );

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
