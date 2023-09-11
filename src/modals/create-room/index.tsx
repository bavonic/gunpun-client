import { Button, CreateErrorNoti, Flex, InputWrapper } from "components";
import { withModalWrapper } from "modals/modalWraper";
import { MapMode } from "modules/maps";
import { FC } from "react";
import { useForm } from "shared/form";
import { ClassNames } from "shared/utils";
import { useSelector } from "stores";


enum FilterType {
  ALL = 'All',
  ONE_VS_ONE = '1 Vs 1',
  TWO_VS_TWO = '2 Vs 2',
  THREE_VS_THREE = '3 Vs 3',
}

export let OnModalCreateRoom: (state: any) => any = () => true;
export const ModalCreateRoom: FC = withModalWrapper({
  center: true,
  bind: (configs) => {
    OnModalCreateRoom = (s) => {
      configs.onModal(s)
      configs.setTitle(`Create Room`)
    };
  },
})((configs) => {
  const maps = useSelector(s => s.maps);
  const pvpMaps = maps.data?.filter(v => [MapMode.DEMO_PVP].includes(v.mode));
  const { inputProps, isSubmitting, handleSubmit } = useForm({
    fields: {
      mode: {
        isRequired: true,
        label: 'Mode:',
        defaultValue: FilterType.ONE_VS_ONE
      }
    },
    onSubmit: async ({ values }) => {
      try {
        // const map = pvpMaps.find(v => v.name === values.mode);
        // if (!map) throw Error("Mode not supported yet.");
        // const room = await createMatchRoom({
        //   mapId: map.id,
        //   loadBackground: map.assetUrl + '/background.png',
        //   params: {
        //     roomName: 'Demo'
        //   }
        // });
      } catch (error) {
        CreateErrorNoti(error.message)
      }
    },
  });

  return <div className="modal-create-room">
    <form onSubmit={handleSubmit}>
      <InputWrapper
        className='mode'
        inputProps={inputProps.mode}
        render={(input) => {
          return <Flex justifyContent='space-around' className='modal-create-room__mode' gap={"1em"}>
            {[
              FilterType.ONE_VS_ONE,
              FilterType.TWO_VS_TWO,
              FilterType.THREE_VS_THREE
            ].map((item, key) => <Button
              key={key}
              buttonType='green'
              className={ClassNames({ active: inputProps.mode.value === item })}
              onClick={() => input.onChange(item)}
            >
              {item === FilterType.ONE_VS_ONE ? "1 VS 1" :
                item === FilterType.TWO_VS_TWO ? "2 VS 2" :
                  "3 VS 3"}
            </Button>)}
          </Flex>
        }}
      />

      <Button className="modal-create-room__submit" isLoading={isSubmitting} type='submit'>
        Create
      </Button>
    </form>
  </div>
})