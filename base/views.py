from django.shortcuts import render, redirect
from .forms import UserForm, UserPerfilForm
from django.contrib.auth import authenticate, login
from django.http import HttpResponse


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

            return redirect('registro')
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
                return HttpResponse("estas adentroooooooooooooooo.")
            else:
                return HttpResponse("Your Rango account is disabled.")
        else:
            return HttpResponse("Invalid login details supplied.")
    else:
        return render(request, template)