import { Form } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FormComponent = ({form, onSubmit,isLoading}) => {

    const route = useRouter()

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6 w-full max-w-full"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="John"
                                        {...field}
                                        className="w-full text-sm sm:text-base"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Doe"
                                        {...field}
                                        className="w-full text-sm sm:text-base"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="+91 9876543210"
                                    {...field}
                                    className="w-full text-sm sm:text-base"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@example.com"
                                    {...field}
                                    className="w-full text-sm sm:text-base"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="ABC Corp."
                                    {...field}
                                    className="w-full text-sm sm:text-base"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="departureDate"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Departure Date</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} className="w-full text-sm sm:text-base" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* --- Physical Address --- */}
                <h4 className="font-semibold mt-4 text-base sm:text-lg border-b pb-2">
                    Physical Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Address Fields */}
                    <FormField
                        control={form.control}
                        name="physicalAddress.addressLine1"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="123 Main St" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="physicalAddress.addressLine2"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Apt 4B" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="physicalAddress.city"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="New York" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="physicalAddress.state"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="NY" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="physicalAddress.zipCode"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="10001" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="physicalAddress.country"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="USA" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* --- Legal Address --- */}
                <h4 className="font-semibold mt-4 text-base sm:text-lg border-b pb-2">
                    Current Legal Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Legal Address Fields */}
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.addressLine1"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="456 Elm St" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.addressLine2"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.city"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Brooklyn" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.state"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="NY" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.zipCode"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Zip Code</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="11201" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentLegalAddress.country"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="USA" className="w-full" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* --- Buttons --- */}
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
                    <Button
                        type="submit"
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Saving..." : "Place Order"}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => route.push("/")}
                        className="w-full sm:w-auto"
                    >
                        Add Another Traveller
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default FormComponent;