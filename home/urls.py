from django.urls import path
from django.conf.urls import include
from . import views
from django.conf.urls.static import static
from django.conf import settings
from home import views

app_name ='home'
urlpatterns = [
    path('home/', views.home, name= 'home'),
    path('', views.home, name= 'home'),
    path('bar/',views.bar_view,name='bar'),
    path('store/',views.store_view,name="store")

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)