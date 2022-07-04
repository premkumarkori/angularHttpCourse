import { Component, OnInit } from '@angular/core';
import { User } from './interfaces/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularHttpCourse';
  users!: User[];
  
  private user: User= {
      'id':1,
      'name': 'Premkumar',
      'username': 'Kori',
      'email': 'premkumar@gmail.com',
      'address': {
        'street': 'Prem Light',
        'suite': 'Apt. 556',
        'city': 'Gwenborough',
        'zipcode': '92998-3874',
        'geo': {
          'lat': '-37.3159',
          'lng': '81.1496'
        }
      },
      'phone': '1-770-736-8031 x56442',
      'website': 'hildegard.org',
      'company': {
        'name': 'Romaguera-Crona',
        'catchPhrase': 'Multi-layered client-server neural-net',
        'bs': 'harness real-time e-markets'
    }
  }

  private patchUser: any = {
      'id': 1,
      'name': 'Premkumar',
      'username': 'Kori',
      'email': 'premkumar@gmail.com',
  }

  constructor(private userService: UserService){}

  ngOnInit(): void {
   // this.onUpdateUser();
   // this.onDeleteUser();
    this.onGetUsers();
    this.onGetUser();
    //this.onCreateUser();
    //this.onGetTextFile();
    
  }

  onGetUsers(): void{
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response)
        this.users =response;
      },
      (err:any) => console.log(err),
      () => console.log('Done retreving users')
    )
  }
  onGetTextFile(): void{
    this.userService.getTextFile().subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('Done retreving textFile')
    )
  }
  onGetUser(): void{
    this.userService.getUser().subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('Done getting user')
    )
  }

  onCreateUser():void{
    this.userService.createUser(this.user).subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('Done creating user')
    )
  }

  onUpdateUser():void{
    this.userService.updateUser(this.user).subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('updateUser')
    )
  }
  
  onPatchUser():void{
    this.userService.patchUser(this.patchUser).subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('patch user')
    )
  }

  onDeleteUser():void{
    this.userService.deleteUser(5).subscribe(
      (response) => console.log(response),
      (err:any) => console.log(err),
      () => console.log('done delete user')
    )
  }
}
