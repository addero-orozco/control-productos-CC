from django.shortcuts import render, redirect
from .forms import UserForm, UserPerfilForm
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def registro(request):
    template = 'base/registro.html'

    if request.method == 'POST':
        user_form = UserForm(request.POST)
        profile_form = UserPerfilForm(request.POST, request.FILES)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user

            if 'picture' in request.FILES:
                profile.picture = request.FILES['picture']
                profile.save()

            return redirect('login')
    else:
        user_form = UserForm()
        profile_form = UserPerfilForm()

    context = {
        'user_form': user_form,
        'profile_form': profile_form,
    }

    return render(request, template, context)

def user_login(request):
    template = 'base/login.html'
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return redirect('ventas:dashboard')
        else:
            return redirect('error_autenticacion')
    else:
        return render(request, template)

@login_required
def user_logout(request):
    logout(request)
    return redirect('ventas:dashboard')

def auth_error(request):
    template = 'base/error_auth.html'
    return render(request, template, {})