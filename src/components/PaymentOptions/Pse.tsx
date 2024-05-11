import React from "react";
import PseLogo from "@/assets/images/pse.png"
import useIpAddress from "@/hooks/useIpAddress";
import useBankList from "@/hooks/useBankList";
import { X } from "lucide-react";
import * as Select from "@/components/ui/select";
import * as Form from "@/components/ui/form";
import { Button, Input } from "@/components/ui/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { identificationOptions } from "@/lib/constants";
import { PaymentDataPse } from "@/types/PaymentPse";
import { useSmartISPContext, useGlobalPaymentResponseContext } from "@/context";
import { useCreatePsePayment } from "@/hooks/useCreatePsePayment";

function Pse({isDisabled}:{isDisabled:boolean}) {
  const [showModal, setShowModal] = React.useState(false);
  const { banks } = useBankList();
  const {subscriber, invoice} = useSmartISPContext()
  const {ipAddress} = useIpAddress()
  const {sendPayOrder} = useCreatePsePayment(subscriber)
  const { setGlobalPsePaymentResponse, setLoading } = useGlobalPaymentResponseContext();
  const FormSchema = z.object({
    bank: z.string({
      required_error: "Selecciona un banco",
    }),
    org_account_number: z.string({
      required_error: "Ingresa el numero de cuenta",
    }),
    org_account_type: z.string({
      required_error: "Selecciona un tipo de cuenta",
    }),
    org_account_username: z.string({
      required_error: "Por favor ingresa el titular de la cuenta",
    }),
    user_type: z.string({
      required_error: "Selecciona el tipo de persona",
    }),
    user_type_fis_number: z.string({
      required_error: "Selecciona el tipo de documento",
    }),
    org_account_nit: z.string({
      required_error: "Ingresa el numero de documento del titular de la cuenta",
    }),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (subscriber && invoice) {
      const psePaymentData: PaymentDataPse = {
        carrier: {
          id: "PSE",
          extra_params: {
            bank_code: "1022",
            //TODO: create response url
            response_url: "https://thanks.red-planet.com.co/",
            origin_account: {
              application_code: "DV-REDPNETPSE-STG-CO-LTP",
              account_number: data.org_account_number,
              account_type: data.org_account_type,
              account_nit: data.org_account_nit,
            },
            destination_account: {
              account_number: "084200089575",
              account_type: "CC",
              account_identification: "900601506",
              account_identification_type: "NIT",
              account_bank_code: "1051",
            },
            user: {
              name: "Red Planet",
              type: data.user_type,
              type_fis_number: data.user_type_fis_number,
              fiscal_number: data.org_account_nit,
              ip_address: ipAddress,
            },
            split: {
              transactions: [
                {
                  application_code: "DV-REDPNETPSEH-STG-CO-LTP",
                  amount: ( Number(invoice.total_pay) / 3).toString(),
                  vat: "0",
                },
                {
                  application_code: "DV-REDPNETPSEH2-STG-CO-LTP",
                  amount: ( Number(invoice.total_pay) / 3).toString(),
                  vat: "0",
                },
                {
                  application_code: "DV-REDPNETPSEH3-STG-CO-LTP",
                  amount: ( Number(invoice.total_pay) / 3).toString(),
                  vat: "0",
                },
              ],
            },
          },
        },
        user: {
          id: subscriber.user.id.toString(),
          email: subscriber.user.email,
          phone_number: subscriber.user.phone,
        },
        order: {
          dev_reference: invoice.num_bill,
          amount: Number(invoice.total_pay),
          vat: 0.0,
          description: `Pago factura #${invoice.num_bill}`,
        },
      };

      sendPayOrder(psePaymentData);
      setShowModal(false);
      form.reset();
    }
  }

  const handleClick = () =>{
    setShowModal(true)
    setGlobalPsePaymentResponse(null)
    setLoading(false)
  }

  return (
    <>
      <Button className="bg-transparent w-30 h-16" variant={"ghost"} disabled={isDisabled}>
        <img
          src={PseLogo}
          alt="Pse"
          width={100}
          height={150}
          className="w-full h-full"
          onClick={handleClick}
        />
      </Button>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                {/* Encabezado del modal */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Realiza tu pago con cuenta bancaria
                  </h2>
                  {/* Botón de cerrar modal con ícono de X */}
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    aria-label="Cerrar modal"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Form.Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                      <Form.FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Bancos</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Selecciona un banco" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectGroup>
                                  <Select.SelectLabel>Bancos</Select.SelectLabel>
                                  {banks.map((bank) => (
                                    <Select.SelectItem
                                      key={bank.name}
                                      value={bank.code}
                                    >
                                      {bank.name}
                                    </Select.SelectItem>
                                  ))}
                                </Select.SelectGroup>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_number"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Numero de cuenta</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Cuenta" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_type"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Tipo de cuenta</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Selecciona el tipo de cuenta" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectItem value="CA">
                                  Cuenta Ahorros
                                </Select.SelectItem>
                                <Select.SelectItem value="CC">
                                  Cuenta Corriente
                                </Select.SelectItem>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_username"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Nombre del titular</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Titular" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="user_type"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Tipo de persona</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Persona" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                <Select.SelectItem value="N">Natural</Select.SelectItem>
                                <Select.SelectItem value="J">Juridica</Select.SelectItem>
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="user_type_fis_number"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Tipo de identificación</Form.FormLabel>
                            <Select.Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <Form.FormControl>
                                <Select.SelectTrigger>
                                  <Select.SelectValue placeholder="Identificación" />
                                </Select.SelectTrigger>
                              </Form.FormControl>
                              <Select.SelectContent>
                                {identificationOptions.map((it) => (
                                  <Select.SelectItem key={it.code} value={it.code}>
                                    {it.code} - {it.description}
                                  </Select.SelectItem>
                                ))}
                              </Select.SelectContent>
                            </Select.Select>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <Form.FormField
                        control={form.control}
                        name="org_account_nit"
                        render={({ field }) => (
                          <Form.FormItem>
                            <Form.FormLabel>Numero de documento</Form.FormLabel>
                            <Form.FormControl>
                              <Input placeholder="Documento" {...field} />
                            </Form.FormControl>
                            <Form.FormMessage />
                          </Form.FormItem>
                        )}
                      />
                      <div className="flex items-center justify-center mt-5">
                        <Button type="submit">Submit</Button>
                      </div>
                    </form>
                  </Form.Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export { Pse };
