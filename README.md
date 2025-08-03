# MiniAPI Tester

A minimalist web REST client (like a lightweight Postman) built with React.  
Quickly test your APIs, view JSON responses, and save requests for later—all in your browser, with no backend and no bloat.

---

##Features

- **Enter URL, HTTP method, headers, and body**  
  Supports all standard REST methods (GET, POST, PUT, DELETE, etc.) and custom headers/body.

- **View JSON or text responses**  
  Pretty-prints JSON responses, or shows raw text if the response is not JSON.

- **Save and reuse requests**  
  Requests are saved to your browser's localStorage. Click to reload and resend.

- **Minimal, clean UI**  
  No distractions, just the essentials for API testing.

---

##  Project Structure

```
miniapi-tester/
│
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── HeaderInput.js         # Header key-value input fields
│   │   ├── MethodSelector.js      # HTTP method dropdown
│   │   ├── RequestBodyInput.js    # Request body textarea
│   │   ├── ResponseViewer.js      # Displays API response
│   │   ├── SavedRequests.js       # List of saved requests
│   │   └── UrlInput.js            # URL input field
│   ├── styles/
│   │   └── App.css                # Main styling
│   ├── App.js                     # Main app logic and layout
│   └── index.js                   # React entry point
├── package.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/miniapi-tester.git
cd miniapi-tester
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the development server

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Usage

### Sending a Request

1. **Enter the API URL**  
   Example: `https://jsonplaceholder.typicode.com/posts/1`

2. **Select HTTP Method**  
   Choose from GET, POST, PUT, DELETE, etc.

3. **Add Headers (optional)**  
   Enter key-value pairs (e.g., `Content-Type: application/json`).

4. **Enter Request Body (optional)**  
   For POST/PUT, enter raw JSON or text.

5. **Send Request**  
   Click **Send Request**. The response will appear below.

### Saving and Loading Requests

- **Save Request:**  
  Click **Save Request** to store the current request in your browser.

- **Load Saved Request:**  
  Click on a saved request in the sidebar to auto-fill the form.

---

## 🧑‍💻 How It Works

- **Frontend only:**  
  All logic runs in your browser. No backend server required.

- **LocalStorage:**  
  Saved requests are stored in your browser and persist between sessions.

- **Fetch API:**  
  Requests are sent using the browser's `fetch` API.

- **CORS:**  
  If you test APIs on a different domain/port, the API must allow CORS.  
  For local Spring Boot APIs, see [CORS Setup](#cors--spring-boot).

---

##  Example: Testing a Spring Boot API

1. **Start your Spring Boot app**  
   By default, it runs at `http://localhost:8080`.

2. **In MiniAPI Tester:**  
   - URL: `http://localhost:8080/api/your-endpoint`
   - Method: GET/POST/etc.
   - Headers: Add as needed
   - Body: Add as needed

3. **CORS & Spring Boot**  
   If you see a CORS error, add this to your controller:
   ```java
   @CrossOrigin(origins = "http://localhost:3000")
   @RestController
   public class YourController { ... }
   ```
   Or, for global CORS:
   ```java
   @Configuration
   public class WebConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/**")
                   .allowedOrigins("http://localhost:3000")
                   .allowedMethods("*");
       }
   }
   ```

---

##  Limitations

- **CORS:**  
  You can only call APIs that allow cross-origin requests from your browser.

- **No authentication helpers:**  
  For APIs requiring OAuth, JWT, etc., you must manually add headers.

- **Body is sent as JSON by default:**  
  If you need to send form data or other types, set the appropriate `Content-Type` header and enter the raw body.

---

##  Customization

- **Add more HTTP methods:**  
  Edit `MethodSelector.js` to add PATCH, OPTIONS, etc.

- **Improve body handling:**  
  Enhance `RequestBodyInput.js` and `App.js` to support form-data, files, etc.

- **Add authentication helpers:**  
  Extend the UI to support Bearer tokens or Basic Auth.

---

## Contributing

Pull requests are welcome!  
Open an issue or submit a PR for improvements.

---

##  License

MIT

---

##  FAQ

**Q: Why do I get a CORS error?**  
A: The API you are calling must allow requests from your browser’s origin. For local APIs, enable CORS as shown above.

**Q: Where are my saved requests stored?**  
A: In your browser’s localStorage. They persist until you clear your browser data.

**Q: Can I use this for production?**  
A: This tool is for development and testing only.

---

##  Contact

For questions or suggestions, open an issue on github
