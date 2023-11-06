using AVSProject.Common;
using AVSProject.DataService;
using AVSProject.EFModel;
using AVSProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AVSProject.Business
{
    public class StudentBusiness
    {
        private static StudentService StudentService = new StudentService();
        private static db_AVSContext dataModel = new db_AVSContext();

        public List<StudentModel> GetStudent()
        {
            List<StudentModel> listData = new List<StudentModel>();
            var getAllStudent = StudentService.GetAllStudent();
            listData = getAllStudent.Select(x => new StudentModel()
            {
                StudentID = x.StudentId,
                BranchId = x.BranchId,
                StudentName = x.StudentName,
                StudentCode = x.StudentCode,
                Gender = x.Gender,
                PhoneNumber1 = x.PhoneNumber1,
                PhoneNumber2 = x.PhoneNumber1,
                DateOfBirth = x.DateOfBirth.HasValue ? x.DateOfBirth.Value : DateTime.Now,
                isInActive = x.IsInactive.HasValue ? x.IsInactive.Value : false,
                CreateAt = x.CreatedAt.HasValue ? x.CreatedAt.Value : DateTime.Now,
                CreateBy = x.CreatedBy.HasValue ? x.CreatedBy.Value : 0,
                ModifiedAt = x.ModifiedAt.HasValue ? x.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = x.ModifiedBy.HasValue ? x.ModifiedBy.Value : 0,
                Descriptions = x.Decriptions
            }).ToList();
            return listData;
        }

        public StudentModel GetStudentByID(int StudentID)
        {
            StudentModel data = new StudentModel();
            var getStudent = StudentService.Get(StudentID);
            if (getStudent == null) return new StudentModel();
            data = new StudentModel
            {
                StudentID = getStudent.StudentId,
                BranchId = getStudent.BranchId,
                StudentName = getStudent.StudentName,
                StudentCode = getStudent.StudentCode,
                Gender = getStudent.Gender,
                PhoneNumber1 = getStudent.PhoneNumber1,
                PhoneNumber2 = getStudent.PhoneNumber1,
                DateOfBirth = getStudent.DateOfBirth.HasValue ? getStudent.DateOfBirth.Value : DateTime.Now,
                isInActive = getStudent.IsInactive.HasValue ? getStudent.IsInactive.Value : false,
                CreateAt = getStudent.CreatedAt.HasValue ? getStudent.CreatedAt.Value : DateTime.Now,
                CreateBy = getStudent.CreatedBy.HasValue ? getStudent.CreatedBy.Value : 0,
                ModifiedAt = getStudent.ModifiedAt.HasValue ? getStudent.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = getStudent.ModifiedBy.HasValue ? getStudent.ModifiedBy.Value : 0,
                Descriptions = getStudent.Decriptions
            };
            return data;
        }

        public void UpdateStudent(StudentModel Student)
        {
            var check = StudentService.Get(Student.StudentID);
            var data = new SStudents
            {
                StudentId = check.StudentId,
                BranchId = check.BranchId,
                StudentName = check.StudentName,
                StudentCode = check.StudentCode,
                Gender = check.Gender,
                PhoneNumber1 = check.PhoneNumber1,
                PhoneNumber2 = check.PhoneNumber1,
                DateOfBirth = check.DateOfBirth.Value,
                IsInactive = check.IsInactive.HasValue ? check.IsInactive.Value : false,
                CreatedAt = check.CreatedAt.HasValue ? check.CreatedAt.Value : DateTime.Now,
                CreatedBy = check.CreatedBy.HasValue ? check.CreatedBy.Value : 0,
                ModifiedAt = check.ModifiedAt.HasValue ? check.ModifiedAt.Value : DateTime.Now,
                ModifiedBy = check.ModifiedBy.HasValue ? check.ModifiedBy.Value : 0,
                Decriptions = check.Decriptions
            };
            if (check == null)
            {
                StudentService.Add(data);
                return;
            }
            else
            {
                StudentService.Update(data);
                return;
            }
        }
        public void DeleteStudent(int StudentID)
        {
            StudentService.Delete(StudentID);
        }
    }
}
