const mongoose = require('mongoose');
const User = mongoose.model('User');
const fetch = require('node-fetch');

exports.get_employee = async (req, res) => {
try{
        let api_data_response = await fetch("http://dummy.restapiexample.com/api/v1/employees");
    if (api_data_response.ok) { 
        let employee_json = await api_data_response.json();
        response.status(200).json(employee_json);
      } else {
        console.log("HTTP-Error: " + api_data_response.status);
      }
    }catch(e){
        console.log('Error is:');
        console.log(e);
    }
}
exports.get = async (request, response) => {
    const listofemployee = await Employee.find({});
    return response.status(200).json(listofemployee);

}

exports.store =  async (request, response)=>{
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let employee = new Employee();
    employee.id = id;
    employee.employee_name = employee_name;
    employee.employee_age = employee_age;
    employee.employee_salary = employee_salary;
    employee.profile_image = profile_image;
    await employee.save();
    return response.status(201).json(employee);
}

exports.update = async (request, response) => {
    let {id, employee_name, employee_salary, employee_age, profile_image} = request.body
    let employee = await Employee.findById(request.params.id);
    if(!employee){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        employee.id = id;
    employee.employee_name = employee_name;
    employee.employee_age = employee_age;
    employee.employee_salary = employee_salary;
    employee.profile_image = profile_image;
    return response.status(201).json(employee);
}
}

exports.destroy = async (request, response)=> {
    let employee = await Employee.findById(request.params.id);
    if(!employee){
        return response.status(204).json({'error': 'Employee Data not found'});
    }else{
        await employee.remove();
        return response.status(204).json(employee);
    }
}

exports.getById = async (request, response) =>{
    let employee = await Employee.findById(request.params.id);
    return response.status(200).json(employee);
}
