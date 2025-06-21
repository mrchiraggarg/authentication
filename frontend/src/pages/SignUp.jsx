import React, { useState, useEffect } from 'react'

const SignUp = () => {
    return (
        <>
            <div class="grid min-h-dvh grid-cols-[1fr_2.5rem_minmax(0,var(--container-lg))_2.5rem_1fr] grid-rows-[1fr_auto_1fr] overflow-clip">
                <div class="col-start-2 row-span-full row-start-1 max-sm:hidden text-gray-950/5 border-x border-x-current bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"></div>
                <div class="col-start-4 row-span-full row-start-1 max-sm:hidden text-gray-950/5 border-x border-x-current bg-size-[10px_10px] bg-fixed bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"></div>
                <main class="grid grid-cols-1 max-sm:col-span-full max-sm:col-start-1 max-sm:row-span-full max-sm:bg-gray-950/5 max-sm:p-2 sm:line-y sm:col-start-3 sm:row-start-2 sm:-mx-px sm:p-[calc(0.5rem+1px)]">
                    <div class="grid grid-cols-1 items-center rounded-xl bg-white max-sm:p-6 sm:p-10">
                        <div class="grid grid-cols-1 gap-10">
                            <div>
                                <form>
                                    <div class="flex flex-col gap-2">
                                        <label for="full_name" class="block text-sm/6 font-medium">Full Name</label>
                                        <input type="text" id="full_name" class="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500" required="" tabindex="1" value="" />
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="email" class="block text-sm/6 font-medium">Email</label>
                                        <input type="email" id="email" class="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500" required="" tabindex="1" value="" />
                                    </div>
                                    <div class="relative mt-6">
                                        <div class="flex flex-col gap-2">
                                            <label for="password" class="block text-sm/6 font-medium">Password</label>
                                            <input type="password" id="password" class="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500" required="" tabindex="1" value="" />
                                        </div>
                                    </div>
                                    <div class="relative mt-6">
                                        <div class="flex flex-col gap-2">
                                            <label for="confirm_password" class="block text-sm/6 font-medium">Confirm Password</label>
                                            <input type="password" id="confirm_password" class="block h-10 w-full appearance-none rounded-lg bg-white px-3 sm:text-sm outline -outline-offset-1 outline-gray-950/15 focus:outline-gray-950 data-error:outline-rose-500" required="" tabindex="1" value="" />
                                        </div>
                                    </div>
                                    <button type="submit" class="mt-10 w-full inline-flex justify-center rounded-full text-sm/6 font-semibold bg-gray-950 text-white hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950 px-4 py-2" tabindex="3">Sign Up</button>
                                    <p class="mt-6 text-sm/6">
                                        <span class="text-gray-600">Already have an account?</span>
                                        <a class="font-semibold hover:text-gray-700" tabindex="5" href="/">
                                            &nbsp;Access Now <span aria-hidden="true">→</span>
                                        </a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default SignUp