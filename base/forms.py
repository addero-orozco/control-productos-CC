from django import forms
from django.contrib.auth.models import User
from .models import UserPerfil

class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password',)

class UserPerfilForm(forms.ModelForm):
    class Meta:
        model = UserPerfil
        fields = ('foto',)