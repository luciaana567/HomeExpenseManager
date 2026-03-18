using HomeExpenseManager.Domain.Entities;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using HomeExpenseManager.Application.Interfaces;
using AutoMapper;
using HomeExpenseManager.Domain.Interfaces.Repositories;

namespace HomeExpenseManager.Application.utils
{
    public class TokenService : ITokenService
    {
        public TokenService()
        {            
        }

        public string GenerateToken(User user)
        {
            var key = Encoding.ASCII.GetBytes("Jpp7rkDfvyQh3kmbUxiLBq4OkDV5VsxO0oKUMAQ9u1x");

            var handler = new JwtSecurityTokenHandler();

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            }),

                Expires = DateTime.UtcNow.AddHours(2),

                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = handler.CreateToken(tokenDescriptor);

            return handler.WriteToken(token);
        }
    }
}
