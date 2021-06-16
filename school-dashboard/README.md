## What is this?

This is a teacher dashboard for the school I work at.


It is based on the Learn Node course by the fabulous Wes Bos.

## Who am I?

I am a middle school teacher learning Web Dev to make some of the non-teaching parts of my job easier.

## What needs to be done?

**Users** - Teachers, Admin, Students.  Each with a different view and ability to change things.


**Landing page** - if you are not logged in then all you see is the login


**Calendar**- Everyone can see the events calendar, but only Admin can add things to the calendar. -- Done, I think


**Callback** - This is the list of late assignments.  only a teacher can create an assignment and it needs to be tagged to the teacher and the student.  Teacher view includes a check box for completed assignment.  
When a student goes here they see a list of all their own assignments from all teachers.  

**Teachers** - Each teacher should have a list of TA students.  These are Teacher Advisory or Homeroom students.  
When a teacher goes to callback they should see a list of callback assignments for their own TA students.  
Alternate page where a teacher sees all the callback assignments that they created.

**Students** - Student has an editable list of up to 8 teachers.  Each student sees the calendar of events, and their callback assignments, and their teacher's current assignments.  

**Current Assignment** - Each teacher should have a current assignment.  updatable by the teacher only on their own home page?  Their students see if on their own home pages. 

**Student Focus** - This is where teachers keep track of students and parent contacts.  Just notes about students that all teachers can see.  Students cannot see this at all.  Teachers and Admin can create and view.  Each one tagged to a student and an author.  Tags - parent contact, behavior, referral.  



**Search** - Only available to teacher or admin.  Search by a student name and pull up that student's info: current assignments, callback, and student focus.  

**User** - Admin only option to adjust user roles.  Currently just isAdmin, and isTeacher booleans, since some people need to be both.  

backend KeystoneJS [Git Repo](https://github.com/mysticfalconvt/School-Keystone-Backend)

Currently viewable at [ncujhs.tech](https://new.ncujhs.tech/)