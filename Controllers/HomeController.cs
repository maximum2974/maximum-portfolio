using Microsoft.AspNetCore.Mvc;
using Maximum_Portfolio.Models;
using System.Diagnostics;

namespace Maximum_Portfolio.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    namespace Portfolio.Controllers
    {
        public class HomeController : Controller
        {
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
            public IActionResult Contact(ContactFormModel model)
            {
                if (ModelState.IsValid)
                {
                    // Handle form submission, e.g., send email or save data to the database
                    ViewBag.Message = "Thank you for reaching out!";
                }
                return View();
            }
        }
    }
}
