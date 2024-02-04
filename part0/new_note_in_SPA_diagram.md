sequenceDiagram
    participant browser
    participant server

    Note right of browser: browser adds the new note to notes and renders the updated notes before making POST request to server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, {content: "new spa note", date:"2024-02-03T23:42:38.568Z"}
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
