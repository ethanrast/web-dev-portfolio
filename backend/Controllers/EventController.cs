using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;

    [Route("api/[controller]")]
    [ApiController]

    public class EventController : ControllerBase
    {
        private readonly IEventInterface _EventInterface;

        public EventController(IEventInterface _EventInterface)
        {
            this._EventInterface = _EventInterface;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetbyId(int id)
        {
            Event? holder = _EventInterface.GetByIdAsync(id).Result;
            if (holder != null) return Ok(holder);
            return NotFound($"id {id} has not been found");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            return Ok(_EventInterface.GetAllAsync().Result);
        }

        [SessionRole("Admin")]
        [HttpPost]
        public async Task<IActionResult> Post(Event entity)
        {
            int? UserId =  HttpContext.Session.GetInt32("UserId");
            if(UserId == null) return BadRequest($"[{false}] no one is logged in");
            entity.CreatedBy = (int)UserId;
            await _EventInterface.CreateAsync(entity);
            return Ok(entity);
        }
        [SessionRole("Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete( int id)
        {
            
            Event? entity = await _EventInterface.GetByIdAsync(id);
            if (entity == null) return NotFound($"Event with id {id} not found");
            bool deleted = await _EventInterface.DeleteAsync(id);
            if (!deleted) return BadRequest("Failed to delete event");
            return Ok($"{entity.Title} has been deleted");

        }

        [SessionRole("Admin")]
        [HttpPut]
        public async Task<IActionResult> Put(EventUpdateDto dto)
        {

            Event? updated = await _EventInterface.UpdateAsync(dto);
            if (updated == null) return NotFound($"Event with id {dto.Id} not found");

            return Ok(updated);
        }

        [HttpPost("{eventId}/attend")]
        public async Task<IActionResult> AttendEvent(int eventId)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");
            EventParticipation? result = await _EventInterface.AttendEvent((int)userId!, eventId);
            if (result == null) return NotFound($"Event id {eventId} or user not found");

            return Ok(result);
        }

        [HttpPost("{eventId}/cancel")]
        public async Task<IActionResult> CancelAttendance(int eventId)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return BadRequest("No one is logged in");

            bool result  = await _EventInterface.CancelAttendance((int)userId, eventId);
            if (result == false) return NotFound($"Event id {eventId} or user not found / not attending");


            return Ok($"user {userId} has canceled his attandance at event {eventId}");
        }
        [HttpGet("{eventId}/check")]
        public async Task<IActionResult> IsAttending(int eventId)
        {
            int? userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return BadRequest("No one is logged in");


            bool check = await _EventInterface.IsAttending((int)userId!,eventId);

            
            return Ok(check);


        }



    }