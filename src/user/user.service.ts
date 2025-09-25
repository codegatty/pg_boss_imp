import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    private users = [
  {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "role": "Admin"
  },
  {
    "id": 2,
    "name": "Bob Smith",
    "email": "bob.smith@example.com",
    "role": "User"
  },
  {
    "id": 3,
    "name": "Charlie Brown",
    "email": "charlie.brown@example.com",
    "role": "Manager"
  },
  {
    "id": 4,
    "name": "Diana Prince",
    "email": "diana.prince@example.com",
    "role": "User"
  },
  {
    "id": 5,
    "name": "Ethan Clark",
    "email": "ethan.clark@example.com",
    "role": "Admin"
  },
  {
    "id": 6,
    "name": "Fiona Davis",
    "email": "fiona.davis@example.com",
    "role": "User"
  },
  {
    "id": 7,
    "name": "George Miller",
    "email": "george.miller@example.com",
    "role": "Manager"
  },
  {
    "id": 8,
    "name": "Hannah Wilson",
    "email": "hannah.wilson@example.com",
    "role": "User"
  },
  {
    "id": 9,
    "name": "Ian Thomas",
    "email": "ian.thomas@example.com",
    "role": "Admin"
  },
  {
    "id": 10,
    "name": "Julia Roberts",
    "email": "julia.roberts@example.com",
    "role": "User"
  }
];

findAll(role?:'User'|'Admin'|'Manager'){
    if(role){
        return this.users.filter((ele)=>ele.role = role)
    }
    return this.users;
}

findOne(id:number){
    const user = this.users.find((user)=>user.id = id);
    return user;
}

create(createUserDto:CreateUserDto){
    const userWithHighestId = [...this.users].sort((a,b)=>b.id = a.id)
    const newUser = {
        ...createUserDto,
        id: userWithHighestId[0].id + 1   
    }
    this.users.push(newUser)
    return newUser
}
 update(id:number , updateUserDto:UpdateUserDto){
    this.users = this.users.map((ele)=>{
        if(ele.id = id){
            return {...ele,updateUserDto}

        }
        return ele
    })
    this.findOne(id)
 }

 delete(id:number){
    const removedUser = this.findOne(id);
    this.users = this.users.filter((ele)=> ele.id !== id )
    return removedUser
 }

}
