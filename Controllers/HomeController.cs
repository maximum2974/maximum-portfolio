using Microsoft.AspNetCore.Mvc;
using Maximum_Portfolio.Models;
using System.Diagnostics;
using Microsoft.Extensions.Logging;
using maximum_portfolio.Services;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Configuration;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

namespace Maximum_Portfolio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    namespace Portfolio.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger<HomeController> _logger;
            private readonly EmailService _emailService;
            private readonly IConfiguration _configuration;

            public HomeController(ILogger<HomeController> logger, EmailService emailService, IConfiguration configuration)
            {
                _logger = logger;
                _emailService = emailService;
                _configuration = configuration;
            }

            public IActionResult Index()
            {
                return View();
            }

            public IActionResult AboutMe()
            {
                return View();
            }
        

            public IActionResult Photography()
            {
                return View();
            }

            public IActionResult Contact()
            {
                return View();
            }

            [HttpPost]
            public async Task<IActionResult> Contact(ContactFormModel model)
            {
                if (ModelState.IsValid)
                {
                    try
                    {
                        await _emailService.SendEmailAsync(model.Name, model.Email, model.Message);
                        await _emailService.SendAutoReplyAsync(model.Email, model.Name);
                        TempData["SuccessMessage"] = "Message sent successfully!";
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error sending email");
                        TempData["ErrorMessage"] = "Failed to send message. Please try again later.";
                    }
                }
                else
                {
                    TempData["ErrorMessage"] = "Invalid form data.";
                }
                return RedirectToAction("Contact");
            }
        }
    }
}
