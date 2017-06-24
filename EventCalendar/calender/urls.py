from django.conf.urls import url
from calender import views

urlpatterns = [
    url(r'', views.index, name='index'),
]