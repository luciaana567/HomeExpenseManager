using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.Common;

public class Result<T>
{
    public bool Success { get; private set; }
    public string Message { get; private set; } = string.Empty;
    public T? Data { get; private set; }
    public List<string> Errors { get; private set; } = new();

    public static Result<T> Ok(T data, string message = "")
        => new()
        {
            Success = true,
            Data = data,
            Message = message
        };

    public static Result<T> Fail(string message, params string[] errors)
        => new()
        {
            Success = false,
            Message = message,
            Errors = errors?.ToList() ?? new List<string>()
        };
}