import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseCard } from '../../models/course-card';

@Component({
  selector: 'app-course',
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit {
  constructor(private http: HttpClient) {}
  courseCards: CourseCard[] = [];
  ngOnInit(): void {
    this.http
      .get<CourseCard[]>('assets/data/course.json')
      .subscribe((data) => (this.courseCards = data));
  }
}
