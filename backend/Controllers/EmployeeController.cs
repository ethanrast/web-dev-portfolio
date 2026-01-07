using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeInterface _EmployeeInterface;

    public EmployeeController(IEmployeeInterface _EmployeeInterface)
    {
        this._EmployeeInterface = _EmployeeInterface;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetbyId(int id)
    {
        Employee? holder = await _EmployeeInterface.GetByIdAsync(id);
        if (holder != null) return Ok(holder);
        return NotFound($"id {id} has not been found");
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _EmployeeInterface.GetAllAsync();
        return Ok(employees);
    }

    [HttpPost]
    public async Task<IActionResult> Post(Employee employee)
    {
        await _EmployeeInterface.CreateAsync(employee);
        return Ok(employee);
    }
}
