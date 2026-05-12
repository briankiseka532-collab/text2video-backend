export default async function handler(req, res) {

  if(req.method !== "POST"){
    return res.status(405).json({
      error:"Method not allowed"
    });
  }

  try {

    const { prompt } = req.body;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/damo-vilab/text-to-video-ms-1.7b",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "hf_xxxxxxxxxxxxxxxxx",
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

    const blob =
      await response.arrayBuffer();

    res.setHeader(
      "Content-Type",
      "video/mp4"
    );

    res.send(
      Buffer.from(blob)
    );

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
