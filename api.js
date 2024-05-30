export function getTodos () {
    return fetch("https://wedev-api.sky.pro/api/v1/personal-key/comments", {
        method: "GET"
      })
      .then((response) => response.json());
};

export function postTodo ({name, text}) {
    return fetch("https://wedev-api.sky.pro/api/v1/personal-key/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          text: text,
          forceError: true,
        }),
      });
};