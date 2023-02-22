jQuery(document).ready(function ($) {
  function triggerPopup(popup) {
    if (popup.hasClass('hidePopup')) {
      popup.removeClass('hidePopup');
    } else {
      popup.addClass('hidePopup');
    }
  }

  function closePopup(popup) {
    popup.addClass('hidePopup');
  }

  $('#openUserProf').on('click', function () {
    let popup = $('#userProf');

    triggerPopup(popup);
  });

  $('#editProfileBtn').on('click', function (e) {
    e.preventDefault();
    let popup = $('#editProfilePopup');

    triggerPopup(popup);
  });
  $('#updatePasswordBtn').on('click', function (e) {
    e.preventDefault();
    let popup = $('#updatePasswordPopup');

    triggerPopup(popup);
  });

  $('#removeAccBtn').on('click', function (e) {
    e.preventDefault();
    let popup = $('#removeAccPopup');
    triggerPopup(popup);
  });

  $('#addTransactionBtn').on('click', function (e) {
    e.preventDefault();
    let popup = $('#addTransactionPopup');
    triggerPopup(popup);
  });
  $('#logoutBtn').on('click', function (e) {
    e.preventDefault();
    let popup = $('#logoutPopup');
    triggerPopup(popup);
  });

  $('#cancelRemAccPopup').on('click', function () {
    let popup = $('#removeAccPopup');
    closePopup(popup);
  });

  $('#cancelLogoutPopup').on('click', function () {
    let popup = $('#logoutPopup');
    closePopup(popup);
  });

  $('#cancelEditProfile').on('click', function () {
    let popup = $('#editProfilePopup');
    closePopup(popup);
  });

  $('#cancelUpdatePassword').on('click', function () {
    let popup = $('#updatePasswordPopup');
    closePopup(popup);
  });

  $(document).on('click', '.transPopupTab', function (e) {
    e.preventDefault();
    let nextActiveTab = $(this);
    let beforeActiveTab = nextActiveTab.parent().parent().find('.active');

    let tab = nextActiveTab.data('tab');

    $('.category-item-icon').removeClass('rounded-md');
    $('.category-item-icon').parent().removeClass('selected');
    $('.feeCat').val('');

    let nextActiveContent = $('#' + tab);
    let beforeActiveContent = nextActiveContent
      .parent()
      .find('.active-content');

    beforeActiveTab.removeClass('active');
    nextActiveTab.addClass('active');

    beforeActiveContent.removeClass('active-content');
    nextActiveContent.addClass('active-content');

    beforeActiveContent.removeClass('flex');
    beforeActiveContent.addClass('hidden');
    nextActiveContent.removeClass('hidden');
    nextActiveContent.addClass('flex');
  });

  $(document).on('click', '.close-transpopup', function () {
    let popup = $('#addTransactionPopup');
    closePopup(popup);
    $('.category-item-icon').each(function () {
      $(this).removeClass('rounded-md');
      $(this).parent().removeClass('selected');
      $('.feeCat').val('');
    });
    if ($('*[data-tab="incomeTab"]').hasClass('active')) {
      $('*[data-tab="incomeTab"]').removeClass('active');
      $('*[data-tab="expenseTab"]').addClass('active');
      $('#incomeTab').addClass('hidden');
      $('#incomeTab').removeClass('flex');
      $('#expenseTab').removeClass('hidden');
      $('#incomeTab').addClass('flex');
      $('#incomeTab').removeClass('active-content');
      $('#expenseTab').addClass('active-content');
    }
  });

  $(document).on('click', '.category-item-icon', function () {
    $('.category-item-icon').each(function () {
      $(this).removeClass('rounded-md');
      $(this).parent().removeClass('selected');
    });
    $(this).addClass('rounded-md');
    $(this).parent().addClass('selected');
  });
});
