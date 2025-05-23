# Maximum Portfolio

A modern, interactive personal portfolio web application built with ASP.NET Core MVC, featuring:
- Animated technical stack and project showcase (GSAP, CSS3)
- Responsive design and beautiful UI
- Contact form with email sending (Gmail SMTP, MailKit)
- Environment-based configuration for security

## Live Demo

Check out the live demo of the Maximum Portfolio application: [Live Demo](http://45.145.228.53:5053/)


## Features
- **Animated Sections**: Technical stack, projects, and GitHub activity with smooth GSAP animations
- **Project Slider**: Horizontal project showcase with touchpad/scroll navigation
- **Contact Form**: Users can send you a message, and both you and the sender receive email notifications
- **Responsive Design**: Looks great on desktop and mobile

## Tech Stack
- **Backend**: ASP.NET Core MVC (.NET 6+)
- **Frontend**: HTML5, CSS3, Bootstrap, GSAP (GreenSock Animation Platform)
- **Email**: MailKit (Gmail SMTP)

## Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/maximum2974/maximum-portfolio.git
   cd maximum-portfolio
   ```

2. **Configuration**
   - Copy `appsettings.Development.json.example` to `appsettings.Development.json` (or create your own)
   - Fill in your Gmail credentials (use [App Passwords](https://support.google.com/accounts/answer/185833?hl=en) for Gmail)
   - **Never commit real passwords!**

   ```json
   {
     "EmailSettings": {
       "SmtpServer": "smtp.gmail.com",
       "Port": 587,
       "Username": "your-gmail@gmail.com",
       "Password": "your-app-password",
       "ToEmail": "your-gmail@gmail.com"
     }
   }
   ```

3. **Build and Run with Docker**
   - Build the Docker image:
     ```bash
     docker build -t maximum-portfolio .
     ```
   - Run the Docker container:
     ```bash
     docker run -d -p 5053:5053 --name maximum-portfolio-container maximum-portfolio
     ```
   The app will be available at `http://localhost:5053`.

## Email Security & Environment Separation
- **appsettings.Development.json**: For local dev only, ignored by git
- **appsettings.Production.json**: For production, never commit to git
- **.gitignore**: Already set to ignore local secrets
- **Production secrets**: Use environment variables or secret managers in deployment

## Deployment
- Use Docker to build and run the application
- Set environment variables or provide `appsettings.Production.json` on the server

## Screenshots
![Home](https://raw.githubusercontent.com/maximum2974/markdown-image/develop/image-20250523191255942.png)
![About Me](https://raw.githubusercontent.com/maximum2974/markdown-image/develop/image-20250523162427505.png)
![Photography](https://raw.githubusercontent.com/maximum2974/markdown-image/develop/image-20250523162452457.png)
![Contact](https://raw.githubusercontent.com/maximum2974/markdown-image/develop/image-20250523162536896.png)

## License
MIT

---

**Security Reminder:** Never commit real passwords or secrets to your repository. Always use environment separation and secret management for production deployments. 