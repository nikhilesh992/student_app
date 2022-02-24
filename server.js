// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
//making students variable to list as dictionary type is not suitable for list of students
var students = [] // should not use {} in multiple dictionaries
// Declare a route for getting all students
fastify.get('/report', async (request, reply) => {

  return students
})

// Declare a route for adding students
fastify.post('/add', async (request, reply) => {
    var result = request.body;
    students.push(result);
    return {status: "success", message:"student "+result.studentId+" got addedd successfully!"}
  })

// Declare a route for deleting students
fastify.post('/delete', async (request, reply) => {
    var result = request.body;
    students = students.filter( el => el.studentId !== result.studentId )
    return {status: "success", message:"student "+result.studentId+" got deleted successfully!"}
  })

// Declare a route for updating students
fastify.post('/update', async (request, reply) => {
    var result = request.body;
    var outbool = students.some(function(obj){
        if (obj.studentId == result.studentId){
             //change the value here
             if(typeof result.subject1 != 'undefined'){
                obj.subject1 = result.subject1
             }
             if(typeof result.subject2!= 'undefined'){
                obj.subject2 = result.subject2
             }
             if(typeof result.subject3!= 'undefined'){
                obj.subject3 = result.subject3
             }
             if(typeof result.subject4!= 'undefined'){
                obj.subject4 = result.subject4
             }
             if(typeof result.subject5!= 'undefined'){
                obj.subject5 = result.subject5
             }
             if(typeof result.studentName!= 'undefined'){
                obj.studentName = result.studentName
             }
             if(typeof result.studentId== 'undefined'){
                return false
             }
             return true;    //breaks out of he loop
        }
     });
     if(!outbool){
        return {status: "fail", message:"Error while updating. Please check if you have given correct studentId!!"}
     }
    return {status: "success", message:"student "+result.studentId+" got deleted successfully!"}
  })

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()