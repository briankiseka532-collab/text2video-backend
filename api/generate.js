export default async function handler(req, res) {

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if(req.method === "OPTIONS"){
    return res.status(200).end();
  }

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
          Authorization: "Bearer YOUR_HF_TOKEN",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    if (!response.ok) {

      const txt =
        await response.text();

      return res.status(500).json({
        error: txt
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

    return res.status(500).json({
      error: err.message
    });

  }

}
