using AVSProject.Interface;
using AVSProject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;

namespace AVSProject.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    //public class MailController
    //{
    //    private readonly IEMailService _mail;

    //    public MailController(IEMailService mail)
    //    {
    //        _mail = mail;
    //    }

    //    [HttpPost("SendEmail")]
    //    public async Task<IActionResult> SendMailAsync(MailData mailData)
    //    {
    //        bool result = await _mail.SendAsync(mailData, new CancellationToken());
    //        if (!result)
    //        {
    //            return new BadRequestResult();
    //        }
    //        return new OkResult();
    //        //if (result)
    //        //{
    //        //    return StatusCode(StatusCodes.Status200OK, "Mail has successfully been sent.");
    //        //}
    //        //else
    //        //{
    //        //    return StatusCode(StatusCodes.Status500InternalServerError, "An error occured. The Mail could not be sent.");
    //        //}
    //    }

    //    //private IActionResult StatusCode(int status500InternalServerError, string v)
    //    //{
    //    //    throw new NotImplementedException();
    //    //}
    //}
}
