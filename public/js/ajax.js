jQuery.fn.extend({
    spinning: function(spin) {
        if (spin) {
            jQuery(this).data('text', jQuery(this).text());
            jQuery(this).width(jQuery(this).width());
            jQuery(this).disabled();
            jQuery(this).html(` <div role="status">
            <svg class="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>`);
        } else {
            jQuery(this).enabled();
            jQuery(this).html(jQuery(this).data('text'));
        }
    },
    enabled: function() {
        return this.each(function() {
            this.disabled = false;
        });
    },
    disabled: function() {
        return this.each(function() {
            this.disabled = true;
        });
    }
});

jQuery(document).ready(function($) {
    function isRequired(input) {
        return input.data('required');
    }

    function isEmpty(input) {
        return $.trim(input.val()).length == 0 ? true : false
    }

    function validateText(input) {
        if (isEmpty(input)) {

            return { status: false, msg: "Please enter valid " + input.data('label') }
        } else {
            return { status: true }
        }
    }

    function validateEmail(input) {
        if (isEmpty(input)) {

            return { status: false, msg: "Please enter valid " + input.data('label') }
        }
        if (!String(input.val()).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return { status: false, msg: "Please enter valid " + input.data('label') }
        }
        return { status: true }
    }

    function validatePassword(input) {
        if (isEmpty(input) || input.val().length < 6) {

            return { status: false, msg: "Please enter valid " + input.data('label') }
        }

        return { status: true }
    }

    function validateForm(formID) {
        let status = true;
        let form = $(formID)
        form.find(':input').each((key, input) => {
            if (!validateInput(input)) {
                status = false
                $(input).focus()
                return false
            }
        })

        return status
    }

    function addErrorMsg(input, msg) {
        input.addClass('border-red-500')
        input.parent().find('.error-msg').html(msg)
    }

    function validateInput(input) {
        $(input).parent().find('.error-msg').empty();
        $(input).removeClass('border-red-500')
        if (isRequired($(input))) {
            let validateAs = $(input).data('validateas')
            if (validateAs == 'text') {
                let validation = validateText($(input))
                if (!validation.status) {
                    addErrorMsg($(input), validation.msg)
                    return false
                }
            } else if (validateAs == "email") {
                let validation = validateEmail($(input))
                if (!validation.status) {
                    addErrorMsg($(input), validation.msg)
                    return false
                }
            } else if (validateAs == "password") {
                let validation = validatePassword($(input))
                if (!validation.status) {
                    addErrorMsg($(input), validation.msg)
                    return false
                }
            }

        }
        return true
    }


    $(document).on('click', '#loginButton', function() {
        let email = $('#email').val()
        let password = $('#password').val()

        let $btn = $(this)
        if ($.trim(email).length == 0 || $.trim(password).length == 0) {
            alert('mail or password is empty')
            return
        }

        $.ajax({
            url: '/users/login',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                email,
                password,
            }),
            beforeSend: function() {
                $btn.spinning(true)
            },
            success: function() {
                $btn.spinning(false)
                window.location.assign('/');
            },
            error: function(result) {
                $btn.spinning(false)
                alert(result.responseJSON.msg)
            }
        })
    })

    $(document).on('click', '#regButton', function() {
        let email = $('#regEmail').val()
        let firstName = $('#regFname').val()
        let lastName = $('#regLname').val()
        let password = $('#regPassword').val()

        let $btn = $(this)

        if (!validateForm('#registrationForm')) {

            return;
        }

        $.ajax({
            url: '/users',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({
                email,
                firstName,
                lastName,
                password,
            }),
            beforeSend: function() {
                $btn.spinning(true)
            },
            success: function() {
                window.location.assign('/');
                $btn.spinning(false)
            },
            error: function(result) {
                alert(result.responseJSON.msg)
                $btn.spinning(false)
            }
        })
    })
    $(document).on('click', '#submitEditProfile', function() {
        let email = $('#editEmail').val()
        let FirstName = $('#editFname').val()
        let LastName = $('#editLname').val()
        let $btn = $(this)

        if ($.trim(email).length == 0 || $.trim(FirstName).length == 0 || $.trim(LastName).length == 0) {
            alert('mail or password is empty')
            return
        }

        $.ajax({
            url: '/users',
            type: 'PATCH',
            contentType: "application/json",
            data: JSON.stringify({
                email,
                FirstName,
                LastName,
            }),
            beforeSend: function() {
                $btn.spinning(true)
            },
            success: function() {
                $btn.spinning(false)
                window.location.assign('/');
            },
            error: function(result) {
                $btn.spinning(false)
                alert(result.responseJSON.msg)
            }
        })
    })

    $(document).on('click', '#updatePassButton', function() {
        let oldPass = $('#editPasswordOld').val()
        let password = $('#editPasswordNew').val()

        let $btn = $(this)

        if ($.trim(oldPass).length == 0 || $.trim(password).length == 0) {
            alert('mail or password is empty')
            return
        }

        $.ajax({
            url: '/users/password',
            type: 'PATCH',
            contentType: "application/json",
            data: JSON.stringify({
                oldPass,
                password,
            }),
            beforeSend: function() {
                $btn.spinning(true)
            },
            success: function() {
                $btn.spinning(false)
                window.location.assign('/');
            },
            error: function(result) {
                $btn.spinning(false)
                alert(result.responseJSON.msg)
            }
        })
    })

    $(document).on('click', '#LogoutButton', function() {

        $.ajax({
            url: '/users/logout',
            type: 'POST',
            contentType: "application/json",
            success: function() {

                window.location.assign('/');

            }
        })
    })
    $(document).on('click', '#RemoveAccButton', function() {

        $.ajax({
            url: '/users',
            type: 'DELETE',
            contentType: "application/json",
            success: function() {

                window.location.assign('/');

            }
        })
    })

    $(document).on('click', '#addTransactionBtn', function() {

        let $btn = $(this)

        $.ajax({
            url: '/categories',
            type: 'GET',
            contentType: "application/json",
            data: JSON.stringify({

            }),
            beforeSend: function() {

            },
            success: function(result) {


                console.log(result)


                $('#transTabArea').html(result);
            },
            error: function(result) {

                alert(result.responseJSON.msg)
            }
        })
    })

    function getExpenses() {
        let expenses;
        $.ajax({
            'async': false,
            url: '/expenses',
            type: 'GET',
            contentType: "application/json",
            data: JSON.stringify({

            }),
            beforeSend: function() {

            },
            success: function(data) {

                expenses = data

            },
            error: function(result) {

                alert(result.responseJSON.msg)
            }
        })

        return expenses
    }

    function getIncomes() {
        let incomes;
        $.ajax({
            url: '/incomes',
            'async': false,
            type: 'GET',
            contentType: "application/json",
            data: JSON.stringify({

            }),
            beforeSend: function() {

            },
            success: function(data) {

                incomes = data

            },
            error: function(result) {

                alert(result.responseJSON.msg)
            }
        })
        return incomes
    }

    function makeTransactionTemplate(transaction) {
        let template = ` <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
             <div class="text-sm text-gray-900">${transaction.createdAt}</div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-gray-900">
          <div class='flex flex-col  mt-2 mb-2' data-id="{{category._id}}">
          <div class=" rounded-full transition-colors duration-300  focus:ring-blue-200 focus:ring-4   text-white cursor-pointer w-12 h-12 flex items-center justify-center border text-3xl font-semibold transition-shadow shadow-sm hover:shadow-lg" style="background-color: ${transaction.category.color};" >
            <span class="icon-fs material-symbols-outlined">
             ${transaction.category.icon.iconName}
            </span>
          </div>
          <h6> ${transaction.category.category}</h6> 
        </div>
          
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          ${transaction.type}
          </span>
        </td>
        <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
          <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          ${transaction.fee}
          </span>
        </td>
        <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
          <a href="#" class="text-indigo-600 hover:text-indigo-900" data-id="${transaction._id}">Edit</a>
        </td>
      </tr>`

        return template
    }

    function initHistory() {
        const expenses = getExpenses()
        const incomes = getIncomes()
        console.log(expenses)
        console.log(incomes)
        const transactions = [...expenses, ...incomes]
            // transactions = transactions.map(function(transaction) {
            //     transaction.time = dateFormat(transaction.time, 'dd.mm.yyyy')
            //     return transaction
            // })

        console.log(transactions)
        for (const transaction of transactions) {

            $('#transactionsHistory').append(makeTransactionTemplate(transaction))

        }
    }

    initHistory()

})