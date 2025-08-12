import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AddUserComponent {
  userForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      nTel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      numPasseport: [''],
      role: ['USER'] // Default role to prevent errors
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      console.log("Sending user data:", newUser); // Debugging output
      this.userService.adduser(newUser).subscribe(response => {
        console.log('Utilisateur ajouté avec succès', response);
        this.router.navigate(['/dashboard/user-list']); // Redirect to the user list page after successful addition
      }, error => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur', error);
      });
    }
  }
}
