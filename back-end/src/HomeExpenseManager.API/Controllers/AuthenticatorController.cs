using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Application.Services;
using HomeExpenseManager.Application.utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HomeExpenseManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthenticatorController: ControllerBase
    {
        private readonly ILoginService _service;
        private readonly ITokenService _tokenService;

        public AuthenticatorController(ILoginService service, ITokenService tokenService)
        {
            _service = service;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _service.Login(dto);

            if (user == null)
                return Unauthorized();

            var token = _tokenService.GenerateToken(user);

            return Ok(new
            {
                token = token
            });
        }
    }
}
