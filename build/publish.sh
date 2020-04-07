#!/bin/bash
branch_name=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
echo On branch: $branch_name
# 发布函数
fun_publish () {
    echo '\n2. start publish...'
    echo 'Please input the commit description: '
    read description
    # null
    if [ ! -n "$description" ]; then description='自动构建发布';fi
    echo $description
    fun_run_log git add .
    fun_run_log git commit -m "$description"
    fun_run_log git push
    echo 'publish success!over~'
}
fun_run_log () {
    echo "\033[33m \n$ $* \033[0m"
    $*
}
fun_green_log () {
    echo "\033[32m$* \033[0m"
}
if [ $branch_name == 'dev' ];
    then
        # build
        echo '\n1. start build...'
        fun_run_log npm run build
        current_path=$(pwd)
        fun_green_log 'build success, publish file list:'
        find ${current_path}/dist -type f
        # make sure
        echo 'Are you sure to publish?（yes/no）'
        read answer
        if [ $answer != 'yes' ]
            then echo Cancel publish, return!
            else fun_publish # publish
        fi
    else 
        echo "Only the branch:dev can publish!You are on $branch_name."
fi
