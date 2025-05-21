using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;

namespace maximum_portfolio.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string name, string email, string message)
        {
            var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? throw new InvalidOperationException("SMTP server not configured");
            var portStr = _configuration["EmailSettings:Port"] ?? throw new InvalidOperationException("SMTP port not configured");
            var username = _configuration["EmailSettings:Username"] ?? throw new InvalidOperationException("Email username not configured");
            var password = _configuration["EmailSettings:Password"] ?? throw new InvalidOperationException("Email password not configured");
            var toEmail = _configuration["EmailSettings:ToEmail"] ?? throw new InvalidOperationException("To email not configured");

            if (!int.TryParse(portStr, out int port))
            {
                throw new InvalidOperationException("Invalid SMTP port configuration");
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Portfolio Contact", username));
            emailMessage.To.Add(new MailboxAddress("Maximum", toEmail));
            emailMessage.Cc.Add(new MailboxAddress("Maximum QQ", "1291185069@qq.com"));
            emailMessage.Subject = $"New Contact Form Message from {name}";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <h3>New Contact Form Submission</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Message:</strong></p>
                    <p>{message}</p>"
            };

            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtpServer, port, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(username, password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }

        public async Task SendAutoReplyAsync(string toEmail, string toName)
        {
            var smtpServer = _configuration["EmailSettings:SmtpServer"] ?? throw new InvalidOperationException("SMTP server not configured");
            var portStr = _configuration["EmailSettings:Port"] ?? throw new InvalidOperationException("SMTP port not configured");
            var username = _configuration["EmailSettings:Username"] ?? throw new InvalidOperationException("Email username not configured");
            var password = _configuration["EmailSettings:Password"] ?? throw new InvalidOperationException("Email password not configured");

            if (!int.TryParse(portStr, out int port))
            {
                throw new InvalidOperationException("Invalid SMTP port configuration");
            }

            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("Maximum", username));
            emailMessage.To.Add(new MailboxAddress(toName, toEmail));
            emailMessage.Subject = "I have received your message!";

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = $@"
                    <div style='font-family: Arial, sans-serif; color: #333;'>
                        <h3 style='color: #4CAF50;'>Thank you for contacting me! <i class='fas fa-envelope-open-text'></i></h3>
                        <p>Hi {toName},</p>
                        <p>I have received your message and will get back to you as soon as possible.</p>
                        <p style='margin-top: 20px;'>
                            <img src='https://raw.githubusercontent.com/maximum2974/markdown-image/develop/3d-profile.jpg' alt='Thank You' style='width: 50px; height: 50px; vertical-align: middle;' />
                        </p>
                        <p>Best regards,<br/><strong>Maximum</strong> <i class='fas fa-smile'></i></p>
                    </div>"
            };

            emailMessage.Body = bodyBuilder.ToMessageBody();

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync(smtpServer, port, SecureSocketOptions.StartTls);
                await client.AuthenticateAsync(username, password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
} 