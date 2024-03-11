const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch("https://api.notion.com/v1/databases/d1215eac56ba4f3ea16866c1f2391988/query", {
    method: "POST",
    headers: {
      "Authorization": "Bearer secret_6OwprP1TSxCiZjUZjLIP89pGC9FbdceRzIEKNJChNNv",
      "Notion-Version": "2021-05-13"
    }
  });
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
