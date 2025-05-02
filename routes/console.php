<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('app:checkout-task')->daily();
