# Refugee Helper - Final assignment for Web Programming Course

# Description
This is an single page application built using Vue 3, Auth0, the Google Maps Javascript API, Node.js, Mongodb and Docker. 

## Features
	REFUGEE USER STORIES:

	As an user I can login and access my profile.

	As an user, I can view the entire map.

	As an user, I can acces any waypoint and send an email to the app administrator.

	As an user, I can submit friendly/dangerous waypoints by asking an admin by email.

	As an user, I can acces any waypoint dangerous waypoints and see the comments and attributes related to the dangerous zone.

	As an user, I can add a comments.
	

	ADMIN USER STORIES:

	As an admin I have all the privileges of regular users and waypoint admins.

	As an admin I can add/delete/modify an user.

	As an admin I can add/delete/modify a waypoint.

	
	WAYPOINT: Location on map. Can be "friendly" or "dangerous". 
	
	Is comprised of a physical location you can see on the map.
	
	Waypoints can be added on the map by an app admin

	If you acces it (by clicking) you can see its description (if it has any), its comment section and it's attributes.

	Waypoints have a list of atributes. These atributes are admin handpicked.

	Friendly waypoints can have atributes like food, shelter, clothing etc. 
	Dangerous waypoints can have atributes like enemy patrols, bombing, mines etc.

	Dangerous waypoints have a red zone/circle around the physical location.

## Architecture

![Architecture](https://user-images.githubusercontent.com/44942678/172966687-53cd3bdb-edeb-4d5b-b087-eca19800787b.png)

## Images

### Default Window Interface

![Regular Interface](https://user-images.githubusercontent.com/44942678/172969573-274a473c-f35c-4cd7-a3a1-22f355c0fdd0.jpg)

### Login Interface
![Login 2](https://user-images.githubusercontent.com/44942678/172969475-1506221f-bd03-4d3e-b9b0-77c3b1f549f2.jpg)

![Login 1](https://user-images.githubusercontent.com/44942678/172969470-89b2c0e1-9e7e-4db8-a201-de9a1267ae3a.jpg)

### Side Menu & Select Waypoint

![Open Menu, Open D Waypoint](https://user-images.githubusercontent.com/44942678/172973490-0ccf3093-7bc1-40ac-8cd1-4aa2352c11a0.jpg)

### Email Admin (as an User)

![Add Email 1](https://user-images.githubusercontent.com/44942678/172973530-a6e77289-f16a-4090-8ffa-78fb13809acf.jpg)

![Add Email 2](https://user-images.githubusercontent.com/44942678/172973540-0bea1459-7a08-409b-88ff-e9083ce294dc.jpg)

### Add Waypoint (as an Admin)

![Add Waypoint](https://user-images.githubusercontent.com/44942678/172973568-6793c524-fba4-4f20-82bf-fa4fc2ce0158.jpg)

### See all Waypoints

![Open Waypoint Menu](https://user-images.githubusercontent.com/44942678/172973609-3cc14f7b-81d0-41e9-9e3a-15f675eac714.jpg)
