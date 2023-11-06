using AVSProject.EFModel;
using AVSProject.Interface;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.DataService
{
    public class StudentService : IStudent
    {
        private static db_AVSContext dbcontext = new db_AVSContext();

        public void Delete(int StudentID)
        {
            var user = dbcontext.SStudents.First(x => x.StudentId == StudentID);
            dbcontext.Remove(user);
            dbcontext.SaveChanges();
        }

        public SStudents Get(int StudentID)
        {
            return dbcontext.SStudents.First(x => x.StudentId == StudentID);
        }

        public List<SStudents> GetAllStudent()
        {
            return dbcontext.SStudents.ToList();
        }

        public void Update(SStudents student)
        {
            var model = dbcontext.Update<SStudents>(student);
            dbcontext.SaveChanges(true);
        }

        public void Add(SStudents student)
        {
            var model = dbcontext.Add<SStudents>(student);
            dbcontext.SaveChanges(true);
        }
    }
}
