from django.shortcuts import render
from user.models import User
    
def home(request):
    context={}
    login_session = request.session.get('login_session','')
    if login_session == '':
        context['login_session'] = False
    else:
        context['login_session'] =True

    
    return render(request,'home/home.html', context)

def bar_view(request):
    return render(request, 'home/bar.html')

def store_view(request):
    return render(request, 'home/store.html')