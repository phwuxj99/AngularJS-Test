using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using A6_Performing_CRUD_Using_Angular.Models;

namespace A6_Performing_CRUD_Using_Angular.Controllers
{
    public class EmployeesAPIController : ApiController
    {
        private Database1Entities db = new Database1Entities();

        // GET: api/EmployeesAPI
        public IQueryable<Student> GetEmployees()
        {
            return db.Students;//.Employees;
        }

        // GET: api/EmployeesAPI/
        [ResponseType(typeof(Student))]
        public IHttpActionResult GetEmployee(string id)
        {
            Student employee = db.Students.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        // PUT: api/EmployeesAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEmployee(string id, Student employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != employee.FirstName)
            {
                return BadRequest();
            }

            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/EmployeesAPI
        [ResponseType(typeof(Student))]
        public IHttpActionResult PostEmployee(Student employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Students.Add(employee);
            db.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { FirstName = employee.FirstName }, employee);
            //return CreatedAtRoute("DefaultApi", new { id = employee.EmpNo }, employee);
        }

        // DELETE: api/EmployeesAPI/5
        [ResponseType(typeof(Student))]
        public IHttpActionResult DeleteEmployee(string id)
        {
            Student employee = db.Students.Find(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Students.Remove(employee);
            db.SaveChanges();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(string firstname)
        {
            return db.Students.Count(e => e.FirstName== firstname) > 0;
        }
    }
}