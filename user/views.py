from django.shortcuts import render, redirect
from django.db import transaction
from .models import User
from argon2 import PasswordHasher
from .forms import RegisterForm, LoginForm

def signup(request):
    register_form = RegisterForm()
    context = {'forms' : register_form} 

    if request.method == 'GET':
        return render(request, 'user/signup.html', context)
    
    elif request.method == 'POST':
        register_form= RegisterForm(request.POST)
        if register_form.is_valid():
            user = User(
                user_id = register_form.user_id,
                user_pw = register_form.user_pw,
                user_name = register_form.user_name,
                user_email = register_form.user_email
                )
            user.save()
            return redirect('/')
    else:
        context['forms'] = register_form
    return render(request, 'user/signup.html',context)

def login(request):
    loginform = LoginForm()
    context ={'forms': loginform}

    if request.method =='GET':
        return render(request, 'user/login.html', context)
    
    elif request.method =='POST':
        loginform =LoginForm(request.POST)

        if loginform.is_valid():
            request.session['login_session'] = loginform.login_session
            request.session.set_expiry(0)
            return redirect('/')
        else:
            context['forms'] = loginform
            if loginform.errors:
                for value in loginform.errors.values():
                    context['error']=value
        return render(request,'user/login.html',context)
    

def logout(request):
    request.session.flush()
    return redirect('/')