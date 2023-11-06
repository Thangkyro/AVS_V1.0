using AVSProject.EFModel;
using System.Collections.Generic;

namespace AVSProject.Interface
{
    public interface IStudent
    {
        SStudents Get(int studentID);
        void Add(SStudents student);
        void Update(SStudents student);
        void Delete(int studentID);
        List<SStudents> GetAllStudent();
    }
}
