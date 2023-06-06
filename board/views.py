from django.shortcuts import render, redirect
from .forms import BoardWriteForm
from .models import Board
from user.models import User
from user.decorators import login_required
from datetime import date, datetime, timedelta

def board_list(request):
    login_session = request.session.get('login_session','')
    context ={'login_session': login_session}

    information_boards = Board.objects.filter(board_name='information')
    meeting_boards = Board.objects.filter(board_name='meeting')
    chat_boards = Board.objects.filter(board_name='chat')
    
    context['information_boards']=information_boards
    context['meeting_boards']=meeting_boards
    context['chat_boards']=chat_boards
    
    return render(request, 'board/board_list.html', context)

from django.shortcuts import get_object_or_404

def board_detail(request, pk):
    login_session = request.session.get('login_session','')
    context = {'login_session': login_session}

    board = get_object_or_404(Board, id=pk)
    context['board']= board

    # 글쓴이 인지 확인
    if board.writer.user_id == login_session:
        context['writer'] = True
    else: 
        context['writer']= False

    response = render(request, 'board/board_detail.html', context)

    #조회수 확인
    expire_date, now = datetime.now(), datetime.now()
    expire_date += timedelta(days=1)
    expire_date = expire_date.replace(hour=0,minute=0, second=0, microsecond=0)
    expire_date -= now
    max_age = expire_date.total_seconds()

    cookie_value = request.COOKIES.get('hitboard','_')

    if f'{pk}' not in cookie_value:
        cookie_value += f'{pk}_'
        response.set_cookie('hitboard', value=cookie_value, max_age=max_age, httponly=True)
        board.hits +=1
        board.save()
    return response


@login_required
def board_write(request):
    login_session = request.session.get('login_session','')
    context ={'login_session': login_session}

    if request.method == 'GET':
        write_form =  BoardWriteForm()
        context['forms'] = write_form
        return render(request, 'board/board_write.html', context)
    
    elif request.method == 'POST':
        write_form = BoardWriteForm(request.POST)

        if write_form.is_valid():
            writer =User.objects.get(user_id = login_session)
            board = Board(
                title = write_form.title,
                contents = write_form.contents,
                writer = writer,
                board_name = write_form.board_name
            )
            board.save()
            return redirect('/board')
        else:
            context['forms']= write_form
            if write_form.errors:
                for value in write_form.errors.values():
                    context['error'] = value
            return render(request,'board/board_write.html', context)

@login_required
def board_modify(request,pk):
    login_session = request.session.get('login_session','')
    context ={'login_session': login_session}

    board = get_object_or_404(Board, id=pk)
    context['board'] = board

    if board.writer.user_id != login_session:
        return redirect(f'/board/board_modify.html',context)
    
    if request.method == 'GET':
        # write_form =  BoardWriteForm()
        # context['forms'] = write_form
        board = get_object_or_404(Board, id=pk)
        context['board']= board
        return render(request, 'board/board_modify.html', context)
    
    elif request.method == 'POST':
        write_form = BoardWriteForm(request.POST)

        if write_form.is_valid():
            
            board.title = write_form.title
            board.contents = write_form.contents
            board.board_name = write_form.board_name

            board.save()


            return redirect('/board')
        else:
            context['forms']= write_form
            if write_form.errors:
                for value in write_form.errors.values():
                    context['error'] = value
            return render(request,'board/board_modify.html', context)


def board_delete(request, pk):
    login_session = request.session.get('login_session','')
    board = get_object_or_404(Board, id =pk)
    if board.writer.user_id == login_session:
        board.delete()
        return redirect('/board')
    else:
        return redirect(f'/board/detail/{pk}/')



#dddddddddddddddddddddddddddddddddddddddddddddddddddddddd
@login_required
def board_write2(request):
    login_session = request.session.get('login_session','')
    context ={'login_session': login_session}

    if request.method == 'GET':
        write_form =  BoardWriteForm()
        context['forms'] = write_form
        return render(request, 'board/board_write2.html', context)
    
    elif request.method == 'POST':
        write_form = BoardWriteForm(request.POST)

        if write_form.is_valid():
            writer =User.objects.get(user_id = login_session)
            board = Board(
                title = write_form.title,
                contents = write_form.contents,
                writer = writer,
                board_name = write_form.board_name
            )
            board.save()
            return redirect('/board')
        else:
            context['forms']= write_form
            if write_form.errors:
                for value in write_form.errors.values():
                    context['error'] = value
            return render(request,'board/board_write2.html', context)
def board_list2(request):
    login_session = request.session.get('login_session','')
    context ={'login_session': login_session}

    py_boards = Board.objects.filter(board_name='Python')
    js_boards = Board.objects.filter(board_name='JavaScript')
    
    context['py_boards']=py_boards
    context['js_boards']=js_boards
    
    return render(request, 'board/board_list2.html', context)
